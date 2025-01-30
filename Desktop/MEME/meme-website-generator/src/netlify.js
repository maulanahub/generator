const NETLIFY_API_URL = 'https://api.netlify.com/api/v1';
const NETLIFY_SITE_ID = 'a33046aa-4431-4efd-b8f4-5a9b11b97d29'; // Replace with your Netlify site ID
const NETLIFY_TOKEN = 'nfp_MAVG4acszFWRfz4UQHKNvfMdr9Zq1mrb145a'; // Replace with your Netlify API token

export const deployToNetlify = async (subdomain, siteData) => {
  try {
    // Step 1: Create a new site on Netlify
    const createSiteResponse = await fetch(`${NETLIFY_API_URL}/sites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${NETLIFY_TOKEN}`,
      },
      body: JSON.stringify({
        name: subdomain, // Subdomain name
        custom_domain: `${subdomain}.yourdomain.com`, // Replace with your domain
      }),
    });

    if (!createSiteResponse.ok) {
      throw new Error('Failed to create site on Netlify');
    }

    const site = await createSiteResponse.json();

    // Step 2: Deploy the site
    const deployResponse = await fetch(`${NETLIFY_API_URL}/sites/${site.id}/deploys`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${NETLIFY_TOKEN}`,
      },
      body: JSON.stringify({
        files: {
          'index.html': `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>${siteData.projectName}</title>
              </head>
              <body>
                <h1>${siteData.projectName}</h1>
                <p>${siteData.description}</p>
                ${siteData.logoUrl ? `<img src="${siteData.logoUrl}" alt="Logo" />` : ''}
              </body>
            </html>
          `,
        },
      }),
    });

    if (!deployResponse.ok) {
      throw new Error('Failed to deploy site on Netlify');
    }

    const deploy = await deployResponse.json();
    return deploy;
  } catch (error) {
    console.error('Error deploying to Netlify:', error);
    throw error;
  }
};