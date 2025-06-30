import { useSelector } from 'react-redux';
import ReduxStore from '~/redux/redux.store';

const useAppSelector = useSelector.withTypes<ReturnType<typeof ReduxStore.getState>>();
export default useAppSelector;