const {createClient} = require('@sanity/client')

// Initialize the Sanity client
const client = createClient({
  projectId: 'j5a0ndtr', // Your project ID
  dataset: 'production', // Your dataset name
  token:
    'skttLYtljaTbdzJHdUZZ3MDXKGXibC8nrnWEt3O2cfv5llhJ5e9ojdAlhF6tlWGsE5hlgcD01JsYF5OwpesB9bGChvB2vZ8zgtTJL5h9RaA8MDBPELZUDezjuiUBzvUXNAS9BTpoJzjhOHmKxx6m1VHKms9YPTwnWlNpkwZTVhK54k7L8kGX', // Replace with your actual token
  useCdn: false,
  apiVersion: '2023-05-03',
})

const assetId = 'image-74a73cd9a9c07c6100253bdf4da39a5091b27150-1080x1350-gif' // Replace with your GIF asset ID

async function findAndDeleteUnusedDocument() {
  try {
    // Find the document referencing the asset
    const documents = await client.fetch(
      `*[_type == "expertises-sectors" && references($assetId)][0]`,
      {assetId},
    )

    if (!documents) {
      console.log('No document found referencing the asset.')
      return
    }

    console.log('Found document:', documents._id)

    // Delete the document
    await client.delete(documents._id)

    console.log('Document deleted successfully.')
  } catch (error) {
    console.error('Error:', error.message)
  }
}

findAndDeleteUnusedDocument()
