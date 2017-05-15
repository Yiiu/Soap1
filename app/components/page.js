/**
 * Created by yuer on 2017/5/15.
 */
import Header from './header'
export default ({ children }) => (
    <div className="page">
        <Header/>
        { children }
    </div>
)