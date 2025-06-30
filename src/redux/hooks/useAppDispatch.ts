import { useDispatch } from 'react-redux';
import ReduxStore from '~/redux/redux.store';

const useAppDispatch = useDispatch.withTypes<typeof ReduxStore.dispatch>();
export default useAppDispatch;