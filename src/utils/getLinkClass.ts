import classNames from 'classnames';

export const getClassHeader = ({ isActive }: { isActive: boolean }) =>
  classNames('header__nav-link', { 'header__nav-link--is-active': isActive });
