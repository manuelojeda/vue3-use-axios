import { ref, computed } from 'vue'
import axios from 'axios'

function useAxios () {
  const axiosPromise = ref(null)
  const hasError = ref(false)
  const loading = ref(false)
  const uploadProgress = ref(0)

  function initWithoutFiles () {
    return axios.create()
  }

  function initWithFiles () {
    return axios.create({
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressHandler
    })
  }

  function progressHandler (progressEvent) {
    uploadProgress.value = parseInt(
      Math.round((progressEvent.loaded * 100) / progressEvent.total).toString(), 10
    )
  }

  async function exec ({ url, method = 'get', data = null, headers = null }, isUploadingFiles = false) {
    loading.value = true

    try {
      const instance = !isUploadingFiles ? initWithoutFiles() : initWithFiles()

      axiosPromise.value = await instance({
        url,
        method,
        data,
        headers
      })
      loading.value = false
      hasError.value = false
    } catch (issue) {
      loading.value = false
      hasError.value = true
      axiosPromise.value = issue.response
    }
  }

  const response = computed(() => {
    if (hasError.value) {
      return null
    }

    return axiosPromise.value
  })

  const error = computed(() => {
    if (!hasError.value) {
      return null
    }

    return axiosPromise.value
  })

  return {
    exec,
    response,
    error,
    loading,
    uploadProgress
  }
}

export default useAxios
