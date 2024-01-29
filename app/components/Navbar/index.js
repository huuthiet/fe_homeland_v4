import React, { useState, Fragment, useRef, useEffect } from 'react';
import ClassNames from 'classnames';
import { NavLink, useHistory } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './style.scss';
import { Avatar } from '@material-ui/core';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col,
  Row,
  Container,
} from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';
import img2 from './en.png';
import img1 from './vi.png';
import messages from './messages';
import MenuButton from '../MenuButton';
import Money from '../../containers/App/format';

//note 
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import makeSelectProfile from '../../containers/Profile/selectors';
import { connect } from 'react-redux';

import {
  getProfile,
} from '../../containers/Profile/actions';

import localStore from 'local-storage';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from '../../containers/Profile/reducer';
import saga from '../../containers/Profile/saga';
// ---------------------

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    cursor: 'pointer',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    border: '1px solid',
    borderRadius: '5px',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  btnLogin: {
    '&:hover': {
      color: 'unset',
    },
  },
}));

const Navbar = props => {
  const history = useHistory();
  const { currentUser = {}, listroom } = props;
  const [toggle, setToggle] = useState(false);
  const classes = useStyles();
  const typingTimeoutRef = useRef(null);

  // note 
  useInjectReducer({ key: 'profile', reducer });
  useInjectSaga({ key: 'profile', saga });
  const {
    profile ={}
  } = props.profile;

  console.log(profile);
  console.log(props);

  useEffect(() => {
    props.getProfile();
    console.log("useEffect");
  }, []);
  //-----------------------

  const menulistSearch = listroom.length > 0 && (
    <div className="listroommenu">
      <Container style={{ padding: '0' }}>
        <ul>
          {listroom.map((item, index) => (
            <li
              key={index.toString()}
              onClick={() => {
                history.push(`/motel/${item._id}`);
                props.changeStoreData('listroom', []);
              }}
            >
              <a>
                <Row>
                  <Col xs={4}>
                    <div className="full-image">
                      {item.images ? (
                        <Avatar
                          style={{
                            width: '80px',
                            height: '80px',
                          }}
                          variant="square"
                          alt="Avatar"
                          src={item.images}
                        >
                          N
                        </Avatar>
                      ) : (
                        <Avatar
                          style={{
                            width: '80px',
                            height: '80px',
                          }}
                          variant="square"
                          alt="Avatar"
                          src="./defaul-room.jpg"
                        >
                          N
                        </Avatar>
                      )}
                    </div>
                  </Col>
                  <Col xs={8} style={{ padding: '0' }}>
                    <h5>Tên: {item.name} </h5>
                    <h6>Địa chỉ: {item.address.address}</h6>
                    <Row>
                      <Col xs={6}>
                        <h6 style={{ color: 'red' }}>
                          Giá: {Money(item.price)} đ
                        </h6>
                      </Col>
                      <Col xs={6}>
                        <p>Liên hê: {item.contactPhone}</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
  const handleSearchTermChange = e => {
    const { value } = e.target;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      // eslint-disable-next-line react/prop-types
      props.Search_Addresses(value);
    }, 500);
  };

  return (
    <div className="navbar-wrapper">
      <div className="header-content clearfix">
        <div className="text-logo">
          <NavLink exact to="/">
            <div className="logo-text">
              <img className="logo zoom-hover" src="/favicon.png" alt="logo" />{' '}
              <FormattedMessage {...messages.home} />
            </div>
          </NavLink>
        </div>
        <ul className="menu-language">
          <li
            className="language-vi"
            onClick={() => {
              props.changeLocale('vi');
            }}
          >
            <img src={img1} alt="language" />
          </li>
          <li
            className="language-en"
            onClick={() => {
              props.changeLocale('en');
            }}
          >
            <img src={img2} alt="language" />
          </li>
          <li className="menulistSearchAll">
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              {
                <FormattedMessage {...messages.search_location}>
                  {msg => (
                    <InputBase
                      autoComplete={{}}
                      placeholder={msg}
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                      onChange={e => {
                        handleSearchTermChange(e);
                      }}
                      className="HanbleSearch"
                    />
                  )}
                </FormattedMessage>
              }
              {menulistSearch}
            </div>
          </li>
        </ul>

        <div
          className={ClassNames(
            'site-nav',
            { 'mobile-menu-hide': !toggle },
            { 'mobile-menu-show': toggle },
          )}
        >
          <ul className="site-main-menu">
            {/* note */}
            {!_.isEmpty(currentUser) && (
              <li>
                <strong>
                  <FormattedMessage {...messages.wallet} />:
                </strong>
                {Money(Number(profile.wallet))}
              </li>
            )}

            {!_.isEmpty(currentUser) && (
              <li>
                <NavLink
                  exact
                  to="/withdraw"
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  <FormattedMessage {...messages.withdraw} />
                </NavLink>
              </li>)}
              {/* ------------------------------- */}
            <li>
              <NavLink
                exact
                to="/terms"
                onClick={() => {
                  setToggle(false);
                }}
              >
                <FormattedMessage {...messages.contact} />
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/about"
                onClick={() => {
                  setToggle(false);
                }}
              >
                <FormattedMessage {...messages.about} />
              </NavLink>
            </li>
            {!_.isEmpty(currentUser) ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Xin chào
                  <strong>
                    {currentUser.lastName} {currentUser.firstName}{' '}
                  </strong>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    onClick={() => {
                      history.push('/profile');
                    }}
                  >
                    <FormattedMessage {...messages.infor} />
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      history.push('/report-problem-list');
                    }}
                  >
                    <FormattedMessage {...messages.reportProblemList} />
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      history.push('/money-information');
                    }}
                  >
                    <FormattedMessage {...messages.money} />
                  </DropdownItem>
                  {currentUser.role.includes('host') && (
                    <>
                      <DropdownItem
                        onClick={() => {
                          history.push('/roomManage');
                        }}
                      >
                        <FormattedMessage {...messages.roomManager} />
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          history.push('/order/list');
                        }}
                      >
                        <FormattedMessage {...messages.order} />
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          history.push('/user/hostMotelRoom');
                        }}
                      >
                        <FormattedMessage {...messages.hostRoomRevenue} />
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          history.push('/historyRoomHost');
                        }}
                      >
                        <FormattedMessage {...messages.hostRoomHist} />
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          history.push('/bill-list');
                        }}
                      >
                        <FormattedMessage {...messages.billList} />
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          history.push('/admin/report-problem-list');
                        }}
                      >
                        <FormattedMessage {...messages.reportProblemList} />
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          history.push('/host/transaction/list');
                        }}
                      >
                        <FormattedMessage {...messages.transactionPayment} />
                      </DropdownItem>
                    </>
                  )}

                  {currentUser.role.includes('master') && (
                    <Fragment>
                      <DropdownItem href="/admin/users">
                        <FormattedMessage {...messages.user} />
                      </DropdownItem>
                      <DropdownItem href="/admin/manager-energy-rooms">
                        <FormattedMessage {...messages.energyRooms} />
                      </DropdownItem>
                      {/* <DropdownItem href="/admin/job/list">
                        <FormattedMessage {...messages.job} />
                      </DropdownItem> */}
                      <DropdownItem href="/admin/order/list">
                        <FormattedMessage {...messages.order} />
                      </DropdownItem>
                      <DropdownItem href="/admin/transaction/list">
                        <FormattedMessage {...messages.transactionPayment} />
                      </DropdownItem>
                      {/* note */}
                      <DropdownItem href="/admin/requestWithdraw/list">
                        <FormattedMessage {...messages.withdrawPayment} />
                      </DropdownItem>
                      {/* ----------------- */}
                      <DropdownItem href="/admin/hostMotelRoom">
                        <FormattedMessage {...messages.host} />
                      </DropdownItem>
                      <DropdownItem href="/admin/historyRoomHost">
                        <FormattedMessage {...messages.hostRoomHist} />
                      </DropdownItem>
                      <DropdownItem href="/admin/bill-list">
                        <FormattedMessage {...messages.billList} />
                      </DropdownItem>
                      <DropdownItem href="/admin/report-problem-list">
                        <FormattedMessage {...messages.reportProblemList} />
                      </DropdownItem>
                    </Fragment>
                  )}

                  {currentUser.role.length === 1 && (
                    <DropdownItem
                      onClick={() => {
                        history.push('/follow-energy');
                      }}
                    >
                      <FormattedMessage {...messages.energyUser} />
                    </DropdownItem>
                  )}

                  <DropdownItem
                    onClick={() => {
                      history.push('/changePassword');
                    }}
                  >
                    <FormattedMessage {...messages.changepassword} />
                  </DropdownItem>

                  <DropdownItem
                    onClick={() => {
                      history.push('/transaction/user/list');
                    }}
                  >
                    <FormattedMessage {...messages.LogtransactionPayment} />
                  </DropdownItem>

                  {/* note */}
                  <DropdownItem
                    onClick={() => {
                      history.push('/requestWithdraw/user/list');
                    }}
                  >
                    <FormattedMessage {...messages.LogRequestWithdraw} />
                  </DropdownItem>
                  {/* ------------------- */}

                  <DropdownItem
                    onClick={() => {
                      history.push('/transactionLog');
                    }}
                  >
                    <FormattedMessage {...messages.TransactionLog} />
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      history.push('/recharge');
                    }}
                  >
                    <FormattedMessage {...messages.addMoney} />
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    onClick={() => {
                      props.changeStoreData('showLogout', true);
                    }}
                  >
                    <FormattedMessage {...messages.logout} />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <li>
                <NavLink
                  exact
                  to="/auth/login"
                  onClick={() => {
                    setToggle(false);
                  }}
                >
                  <i className="fa fa-sign-in" aria-hidden="true" />{' '}
                  <FormattedMessage {...messages.signin_signup} />
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <div
          className="menu-toggle mobile-visible"
          onClick={() => {
            setToggle(!toggle);
          }}
          role="presentation"
        >
          <MenuButton toggle={toggle} />
        </div>
      </div>
      <div className="mobisearch">
        <li className="menulistSearchAll">
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            {
              <FormattedMessage {...messages.search_location}>
                {msg => (
                  <InputBase
                    placeholder={msg}
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={e => {
                      handleSearchTermChange(e);
                    }}
                  />
                )}
              </FormattedMessage>
            }
            {menulistSearch}
          </div>
        </li>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  dispatch: PropTypes.func,
  currentUser: PropTypes.object,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    getProfile: () => {
      dispatch(getProfile());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Navbar);

// export default Navbar;
