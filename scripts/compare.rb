#!/usr/bin/env ruby
# frozen_string_literal: true

# Compares the rendered HTML text from the existing Gatsby site with the Astro
# migration. It deliberately ignores markup and styling: only page text is
# compared.
#
# Typical use (run both dev servers first):
#   ruby scripts/compare.rb
#
# Other useful forms:
#   ruby scripts/compare.rb --old https://old.example.com --new https://new.example.com
#   ruby scripts/compare.rb --paths / /about-us/ /projects/
#   ruby scripts/compare.rb --paths-file pages.txt --fail-on-diff
#   ruby scripts/compare.rb --paths

require "cgi"
require "net/http"
require "open3"
require "optparse"
require "set"
require "tempfile"
require "uri"

DEFAULT_OLD_URL = ENV.fetch("OLD_URL", "http://localhost:8000")
DEFAULT_NEW_URL = ENV.fetch("NEW_URL", "http://localhost:4321")

options = {
  old_url: DEFAULT_OLD_URL,
  new_url: DEFAULT_NEW_URL,
  sitemap: nil,
  paths_file: nil,
  timeout: 20,
  fail_on_diff: false,
  paths_only: false
}

parser = OptionParser.new do |opts|
  opts.banner = "Usage: ruby scripts/compare.rb [options] [PATH ...]"
  opts.separator ""
  opts.separator "Compare visible page text between an old Gatsby site and its Astro migration."
  opts.separator "With no paths supplied, pages are read from the old site's sitemap."
  opts.separator ""
  opts.on("--old URL", "Old Gatsby base URL (default: #{DEFAULT_OLD_URL})") { |value| options[:old_url] = value }
  opts.on("--new URL", "New Astro base URL (default: #{DEFAULT_NEW_URL})") { |value| options[:new_url] = value }
  opts.on("--sitemap URL", "Sitemap URL; defaults to old /sitemap-index.xml, then /sitemap.xml") { |value| options[:sitemap] = value }
  opts.on("--paths", "Show only a table of checked paths and their statuses") { options[:paths_only] = true }
  opts.on("--paths-file FILE", "Newline-separated paths to compare (instead of a sitemap)") { |value| options[:paths_file] = value }
  opts.on("--timeout SECONDS", Integer, "HTTP timeout per request (default: 20)") { |value| options[:timeout] = value }
  opts.on("--fail-on-diff", "Exit 1 if text differs") { options[:fail_on_diff] = true }
  opts.on("-h", "--help", "Show this help") { puts opts; exit }
end

parser.parse!

def normalised_base_url(value)
  uri = URI.parse(value)
  raise OptionParser::InvalidArgument, "URL must include http:// or https://: #{value}" unless uri.is_a?(URI::HTTP) && uri.host

  uri.path = uri.path.sub(%r{/+$}, "")
  uri.query = nil
  uri.fragment = nil
  uri.to_s
end

def url_for(base_url, path)
  base = URI.parse(normalised_base_url(base_url))
  request_uri = URI.parse(path)
  raise OptionParser::InvalidArgument, "expected a path, got: #{path}" if request_uri.absolute?

  base.path = "#{base.path}/#{request_uri.path.sub(%r{\A/}, "")}".gsub(%r{/+}, "/")
  base.path = "/" if base.path.empty?
  base.query = request_uri.query
  base.to_s
end

def normalised_path(value)
  uri = URI.parse(value)
  raise OptionParser::InvalidArgument, "expected a path, got: #{value}" if uri.absolute?

  path = uri.path.empty? ? "/" : uri.path
  path += "?#{uri.query}" if uri.query
  path
end

def fetch(url, timeout:, redirects: 5)
  raise "too many redirects while fetching #{url}" if redirects.negative?

  uri = URI.parse(url)
  request = Net::HTTP::Get.new(uri.request_uri, { "User-Agent" => "gatsby-astro-text-compare/1.0" })
  response = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == "https", open_timeout: timeout, read_timeout: timeout) do |http|
    http.request(request)
  end

  case response
  when Net::HTTPSuccess
    response.body
  when Net::HTTPRedirection
    location = response["location"]
    raise "redirect without a Location header at #{url}" unless location

    fetch(URI.join(url, location).to_s, timeout: timeout, redirects: redirects - 1)
  else
    raise "HTTP #{response.code} #{response.message} for #{url}"
  end
end

def remove_non_displayed_elements(html)
  # A full browser would resolve every CSS rule. This small HTML pass handles
  # the two common, explicit ways that non-displayed copy appears in the
  # migration output: the `hidden` attribute and screen-reader-only helpers.
  # It tracks nested elements, so a hidden mobile-menu wrapper does not leak
  # the text from its child links into the comparison.
  void_elements = %w[area base br col embed hr img input link meta param source track wbr]
  stack = []
  output = +""

  html.scan(/<!--[\s\S]*?-->|<[^>]*>|[^<]+/) do |token|
    next if token.start_with?("<!--")

    if token.start_with?("<")
      if (closing = token.match(%r{\A</\s*([\w:-]+)}))
        index = stack.rindex { |element| element[:name] == closing[1].downcase }
        stack.slice!(index..-1) if index
        output << token unless stack.any? { |element| element[:hidden] }
        next
      end

      opening = token.match(/\A<\s*([\w:-]+)/)
      next unless opening

      name = opening[1].downcase
      class_names = token[/\bclass\s*=\s*(["'])(.*?)\1/i, 2].to_s.split
      hidden = token.match?(/\bhidden(?:\s|=|\/?>)/i) || (class_names & %w[sr-only visually-hidden]).any?
      hidden ||= stack.any? { |element| element[:hidden] }
      output << token unless hidden
      stack << { name: name, hidden: hidden } unless void_elements.include?(name) || token.end_with?("/>")
    else
      output << token unless stack.any? { |element| element[:hidden] }
    end
  end

  output
end

def visible_text(html)
  text = html.dup
  # These elements do not provide text displayed in the page body. SVG titles
  # are also omitted because they are alternate/accessibility text, not body copy.
  text.gsub!(/<!--.*?-->/m, " ")
  text.gsub!(/<(script|style|noscript|template|head|svg)\b[^>]*>.*?<\/\1\s*>/im, " ")
  text = remove_non_displayed_elements(text)
  text.gsub!(/<(br|hr)\b[^>]*>/i, "\n")
  text.gsub!(/<\/?(address|article|aside|blockquote|caption|dd|div|dl|dt|fieldset|figcaption|figure|footer|form|h[1-6]|header|li|main|nav|ol|p|pre|section|table|td|th|tr|ul)\b[^>]*>/i, "\n")
  text.gsub!(/<[^>]+>/m, " ")
  text = CGI.unescapeHTML(text)

  text.lines.map { |line| line.gsub(/[[:space:]]+/, " ").strip }.reject(&:empty?).join("\n")
end

def browser_driver
  require "selenium-webdriver"

  chrome_options = Selenium::WebDriver::Chrome::Options.new
  chrome_options.add_argument("--headless=new")
  chrome_options.add_argument("--disable-gpu")
  chrome_options.add_argument("--no-sandbox")
  chrome_options.add_argument("--window-size=1440,1200")
  Selenium::WebDriver.for(:chrome, options: chrome_options)
rescue LoadError
  raise <<~MESSAGE
    This script needs the selenium-webdriver gem to read browser-rendered text.
    Install it with: gem install selenium-webdriver
  MESSAGE
end

def rendered_text(driver, url, timeout)
  driver.navigate.to(url)
  Selenium::WebDriver::Wait.new(timeout: timeout).until do
    driver.execute_script("return document.readyState") == "complete"
  end
  # Gatsby development pages hydrate after the document load event. Waiting for
  # their text to remain stable avoids comparing the empty Gatsby mount element.
  previous = nil
  10.times do
    current = driver.execute_script("return document.body ? document.body.innerText : ''")
    return current if current == previous && !current.strip.empty?

    previous = current
    sleep 0.1
  end
  previous
end

def normalised_rendered_text(text)
  text.lines.map { |line| line.gsub(/[[:space:]]+/, " ").strip }.reject(&:empty?).join("\n")
end

def sitemap_paths(sitemap_url, timeout, seen = Set.new)
  return [] if seen.include?(sitemap_url)

  seen << sitemap_url
  xml = fetch(sitemap_url, timeout: timeout)
  locations = xml.scan(/<loc\b[^>]*>\s*(.*?)\s*<\/loc>/im).flatten.map { |location| CGI.unescapeHTML(location) }
  raise "no <loc> entries found in sitemap #{sitemap_url}" if locations.empty?

  locations.flat_map do |location|
    absolute_location = URI.join(sitemap_url, location).to_s
    uri = URI.parse(absolute_location)
    if uri.path.end_with?(".xml")
      sitemap_paths(absolute_location, timeout, seen)
    else
      # Sitemap locations are usually absolute. Only their path/query is needed
      # so the same page can be requested from both local servers.
      path = uri.path.empty? ? "/" : uri.path
      path += "?#{uri.query}" if uri.query
      path
    end
  end
rescue URI::InvalidURIError => error
  raise "invalid URL in sitemap #{sitemap_url}: #{error.message}"
end

def unified_diff(old_text, new_text, path)
  old_file = Tempfile.new(["gatsby-text-", ".txt"])
  new_file = Tempfile.new(["astro-text-", ".txt"])
  old_file.write("#{old_text}\n")
  new_file.write("#{new_text}\n")
  old_file.close
  new_file.close
  output, = Open3.capture2("diff", "-u", old_file.path, new_file.path)
  output.sub(/^--- .*\n/, "--- Gatsby #{path}\n").sub(/^\+\+\+ .*\n/, "+++ Astro  #{path}\n")
ensure
  old_file&.unlink
  new_file&.unlink
end

old_base = normalised_base_url(options[:old_url])
new_base = normalised_base_url(options[:new_url])

paths = if options[:paths_file]
  File.readlines(options[:paths_file], chomp: true).map(&:strip).reject { |line| line.empty? || line.start_with?("#") }
elsif ARGV.any?
  ARGV
else
  sitemap_urls = options[:sitemap] ? [options[:sitemap]] : [url_for(old_base, "/sitemap-index.xml"), url_for(old_base, "/sitemap.xml")]
  sitemap_url = sitemap_urls.find do |candidate|
    begin
      fetch(candidate, timeout: options[:timeout])
      true
    rescue StandardError
      false
    end
  end
  raise "could not find a sitemap; pass --sitemap or list paths explicitly" unless sitemap_url

  sitemap_paths(sitemap_url, options[:timeout])
end

paths = paths.map { |path| normalised_path(path) }.uniq.sort
raise "no pages to compare" if paths.empty?

changed = 0
errors = 0
results = []
driver = browser_driver
begin
  paths.each do |path|
    old_url = url_for(old_base, path)
    new_url = url_for(new_base, path)
    begin
      old_text = normalised_rendered_text(rendered_text(driver, old_url, options[:timeout]))
      new_text = normalised_rendered_text(rendered_text(driver, new_url, options[:timeout]))
      if old_text == new_text
        results << [path, "OK"]
        puts "OK      #{path}" unless options[:paths_only]
      else
        changed += 1
        results << [path, "CHANGED"]
        unless options[:paths_only]
          puts "CHANGED #{path}"
          puts unified_diff(old_text, new_text, path)
        end
      end
    rescue StandardError => error
      errors += 1
      results << [path, "ERROR"]
      warn "ERROR   #{path}: #{error.message}" unless options[:paths_only]
    end
  end
ensure
  driver.quit
end

if options[:paths_only]
  path_width = ["PATH".length, *results.map { |path, _status| path.length }].max
  status_width = ["STATUS".length, *results.map { |_path, status| status.length }].max
  puts format("%-#{path_width}s  %-#{status_width}s", "PATH", "STATUS")
  puts "#{"-" * path_width}  #{"-" * status_width}"
  results.each { |path, status| puts format("%-#{path_width}s  %-#{status_width}s", path, status) }
else
  puts "\nCompared #{paths.length} page#{paths.length == 1 ? "" : "s"}: #{changed} changed, #{errors} error#{errors == 1 ? "" : "s"}."
end
exit 1 if errors.positive? || (options[:fail_on_diff] && changed.positive?)
