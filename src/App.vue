<template>
  <FileInput v-model="file" is-pdf />

  <button @click="postData">
    Post me
  </button>

  <div>
    {{ loading }}
  </div>
  <div>
    {{ uploadProgress }}%
  </div>
</template>

<script>
import { ref } from 'vue'
import FileInput from 'vue3-simple-file-input'
import useAxios from './composables/useAxios'

export default {
  name: 'App',
  components: {
    FileInput
  },
  setup () {
    const characters = ref(null)
    const file = ref(null)
    const { response, error, exec, loading, uploadProgress } = useAxios()

    async function fetchData () {
      await exec({
        url: 'https://rickandmortyapi.com/api/character'
      })

      characters.value = await !error.value ? await response.value : null
    }

    async function postData () {
      const formData = new FormData()
      formData.append('file', file.value.file)

      await exec({
        url: 'http://testing.me/api/postMe',
        method: 'post',
        data: formData
      }, true)

      uploadProgress.value = 0

      console.log(response.value)
    }

    return {
      characters,
      fetchData,
      response,
      error,
      exec,
      loading,
      file,
      postData,
      uploadProgress
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
