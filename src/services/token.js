import cookie from 'js-cookie'
class TokenServices {
  token () {
    return cookie.get('t')
  }
}
export default TokenServices
// # sourceMappingURL=token.js.map
