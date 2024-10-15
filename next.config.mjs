export default {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/pages/login',
          permanent: true, // Define se o redirecionamento é permanente (301) ou temporário (307)
        },
      ]
    },
  }