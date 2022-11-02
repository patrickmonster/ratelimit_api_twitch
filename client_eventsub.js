const axios = require('axios');


// 토큰 가져옴
const getToken = (type, ...scope) =>
  cache.has(type)
    ? Promise.resolve(cache.get(type))
    : axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.identity_client}&client_secret=${process.env.identity_secret}&grant_type=client_credentials${scope ? '&' : ''}${scope.join('%20')}`).then(({ data: token }) => {
        cache.set(
          type,
          {
            'Client-ID': process.env.identity_client,
            Authorization: `Bearer ${token.access_token}`,
            'Content-Type': 'application/json',
          },
          token.expires_in
        );
        return token.access_token;
      });
