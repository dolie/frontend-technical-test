import axios from 'axios'

export default function initAxios() {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL
  axios.defaults.timeout = 2000 // only 2 seconds, because server is local ⚡

  axios.interceptors.request.use(request => request, error => {
    console.error(error) // logging service (e.g. Sentry/Datadog) may stand here
    return Promise.reject(error)
  })

  axios.interceptors.response.use(response => response, error => {
    console.error(error) // logging service (e.g. Sentry/Datadog) may stand here
    return Promise.reject(error)
  })
}
