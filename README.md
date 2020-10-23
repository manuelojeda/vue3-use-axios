# Vue 3 useAxios

Axios wrapper for **Vue 3**. To install it use:

`npm i vue3-use-axios`

The only dependency needed for is axios, please install it first with:

`npm i axios`

## How to use it

Import the composable inside your component like this

```html
Example.vue

<script>
import useAxios from 'vue3-use-axios'

export default ({
  name: 'YourComponent',
  setup () {
    const { response, error, loading, uploadProgress, exec } = useAxios()

    const yourFunction = async () => {
      await exec({
        url: 'https://rickandmortyapi.com/api/character',
        method: 'get'
      })

      // You can validate if an error occurs, set the data where you need to be or not
      characters.value = await !error.value ? await response.value : null
    }

    return {
      // You can return whaever you need or use it inside the component logic
    }
  }
})
</script>
```

## What the composable provides

This composable gives to you a wrapper to easily use axios and consumes a HTTP Endpoint.

```js
exec({
  url: '<YOUR ENDPOINT GOES HERE>',
  method: 'post',
  data: {
    // Whaever you need here
  }
})
```

Also, in case you need to upload files using FormData you can do something like this:

```js
const formData = new FormData()

// You need to set to true the next parameter after the object, with this the wrapper will detect that you are loading files
exec({
  url: '<YOUR ENDPOINT GOES HERE>',
  method: 'post',
  data: formData
}, true)
```

With the last example you can use the **uploadProgress** property, this will gives you the percentage of the upload in case you need it.

## The **exec**  syntax

Those are the parameters accepted by the **exec** function:

```js
(options, isUploadingFiles = false)

You can send usual the axios configurations through the options object, it will be destructured inside the composable
```

---
