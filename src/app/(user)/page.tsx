import { redirect } from 'next/navigation';
import RouterUtil from '~/utils/router.util';

const UserPage = () => {
  return redirect(RouterUtil.Group.genList());
};

export default UserPage;
