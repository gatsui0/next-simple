// next.config.js
module.exports = {
    async redirects() {
      return [
        {
          source: '/', // Caminho original
          destination: '/pages/login.tsx', // Novo caminho
          permanent: true, // Se o redirecionamento é permanente (status 308)
        },
      ];
    },
  };