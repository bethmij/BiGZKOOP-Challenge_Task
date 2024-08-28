import { call, put, takeEvery} from 'redux-saga/effects'
import {setUserTableData} from "../slices/userSlice";

function* fetchUser() {
    try {
        const user = yield call(()=>fetch('https://jsonplaceholder.typicode.com/users'))
        yield put(setUserTableData(user.json()))
    } catch (e) {
        yield put({ type: 'USER_FETCH_FAILED'})
    }
}


function* userSaga() {
    yield takeEvery('user/setUserTableData', fetchUser)
}

export default userSaga