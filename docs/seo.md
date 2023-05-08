## **Explanation on SEO links on Blogposts list page**

The issue was described in the [Nozbe task]( https://nozbe.app/teams/Xi3SI50NCpPkVxNz/task_id/Diz1pPbgDf472JQE)

After investigation, I found few possible solutions: 
1. exclude pages with `/blog/x` paths from sitemap and(or) mark them with `noindex` 
2. change the pagination logic, make it not via `/blog/x` but via `/blog?page=x` (via parameters)
3. stay with the current variant

I recommend the 3rd variant to use. 

**Why?**

According to the sources I think that this could be the best solution. 
First of all because of next reasons:
1. The 2nd solution can't be done with Gatsby (4th link in Sources is the link to the Gatsby docs, and if we will try we won't succeed (I have tried))
2. The 1st variant is the worst option according to the 3rd item in the Sources list (Google documentation) here is the quote from it:
>Don't use the first page of a paginated sequence as the canonical page. Instead, give each page in its own canonical URL.

Sources, used in this investigation:
1. https://developers.google.com/search/docs/crawling-indexing/canonicalization.
2. https://www.searchenginejournal.com/what-is-a-canonical-url/469636/ 
3. https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading#use-urls-correctly
4. https://www.gatsbyjs.com/docs/adding-pagination/

