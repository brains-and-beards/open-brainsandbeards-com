"""Summarize three Lighthouse performance runs per page and device."""

import json
import os
from pathlib import Path

def summarize(directory):
    rows = []
    warnings = []
    for page, path in [("home", "/"), ("blog", "/blog/")]:
        for device in ["mobile", "desktop"]:
            report = json.loads(
                (directory / f"{page}-{device}.report.json").read_text()
            )
            score = report["categories"]["performance"]["score"]
            if report.get("runtimeError") or score is None:
                raise ValueError(f"Lighthouse could not audit {path} on {device}")
            status = "⚠️ Warning" if score < 80 else "✅ Success"
            rows.append(f"| `{path}` | {device.title()} | {score}/100 | {status} |")
            if score < 80:
                warnings.append(f"{path} ({device}): {score}/100 is below 80")

    heading = (
        "⚠️ Lighthouse performance: scores below 80."
        if warnings
        else "✅ Lighthouse performance: all scores are at least 80."
    )
    report = "\n".join([
        heading,
        "",
        f"Commit: `{os.environ['HEAD_SHA']}`",
        "",
        "| Page | Device | Performance | Result |",
        "| --- | --- | --- | --- |",
        *rows,
        "",
        "Performance is scored against the PR's local production build. Warning threshold: 80/100.",
    ])
    return report, warnings


if __name__ == "__main__":
    report, warnings = summarize(Path("lighthouse-results"))
    for warning in warnings:
        print(f"::warning title=Lighthouse performance::{warning}")
    with open(os.environ["GITHUB_STEP_SUMMARY"], "a") as summary:
        summary.write(report + "\n")
    with open(os.environ["GITHUB_OUTPUT"], "a") as output:
        output.write(f"comment<<LIGHTHOUSE_REPORT\n{report}\nLIGHTHOUSE_REPORT\n")
