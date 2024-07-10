# Vercel research
Merj's Search Engine Web Rendering Monitoring, a detailed library for tracking search engine page rendering, is shared here in a custom lightweight version tailored for our upcoming research conducted in partnership with Vercel.

# Setup
Install the dependencies using npm:
```bash
   npm install
```

# Build
Build the library using npm:
```bash
   npm run build
```

## FAQ
- Will this negatively impact Core Web Vitals metrics or the user experience on your website?
No. The library is specifically designed for User-Agents that match the regex defined for this research; users won’t even download the script. Since Core Web Vitals metrics are derived from real user experience data, the operations of this library do not influence these measurements.
- Will this impact your "crawl budget"?
The beacons are sent to a third-party domain (the server used for this research), we do not anticipate any impact on your domain's "crawl budget".
- Will this slow down search engine rendering?
Merj's Search Engine Web Rendering Monitoring is designed with optimal efficiency in mind. For this research, we utilise an even lighter version of the library that only sends a single, small request to the research server, transmitting less than 100 bytes of data. Excluding the time required to send the request, this should not slow down search engine rendering.
- What data are we sending to the testing server?
This version of the library only sends the page URL, the request ID, and the event type (e.g., "load").