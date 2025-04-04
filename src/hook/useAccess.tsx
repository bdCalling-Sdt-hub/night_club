import {useAuth} from '../context/AuthProvider';

export const userAccess = ({
  GRole,
}: {
  GRole: 'super' | 'upper' | 'middler' | 'ground' | 'manager';
}) => {
  const {user} = useAuth();
  // super users can access all
  if (GRole === 'super') {
    if (user?.role === 'super-owner') {
      return true;
    } else {
      return false;
    }
  }
  // owner can access all except super-owner
  else if (GRole === 'upper') {
    if (user?.role === 'super-owner' || user?.role === 'owner') {
      return true;
    }
  } else if (GRole === 'middler') {
    if (
      user?.role === 'super-owner' ||
      user?.role === 'owner' ||
      user?.role === 'manager'
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Ground Label can access
  else if (GRole === 'ground') {
    // guard can access only guard
    if (
      user?.role === 'super-owner' ||
      user?.role === 'owner' ||
      user?.role === 'manager' ||
      user?.role === 'guard'
    ) {
      return true;
    }
  } else {
    return false;
  }
};
