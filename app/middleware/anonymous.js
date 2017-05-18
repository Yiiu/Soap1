/**
 * Created by yuer on 2017/5/18.
 */
export default function ({ store, redirect }) {
    if (store.getters.isAuthenticated) {
        return redirect('/')
    }
}