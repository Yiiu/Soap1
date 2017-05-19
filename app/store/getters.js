/**
 * Created by yuer on 2017/5/19.
 */

export default {
    isAuthenticated (state) {
        return !!state.token
    }
}