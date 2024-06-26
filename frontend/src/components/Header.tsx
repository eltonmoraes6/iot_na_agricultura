import { LoadingButton as _LoadingButton } from '@mui/lab';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogoutUserMutation } from '../redux/api/authApi';
import { useAppSelector } from '../redux/store';
import PostModal from './modals/post.modal';
import CreatePost from './post/create-post';

const LoadingButton = styled(_LoadingButton)`
  padding: 0.4rem;
  color: #222;
  font-weight: 500;
  border: 2px solid #222;
  margin-right: 1rem;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Header = () => {
  const [openPostModal, setOpenPostModal] = useState(false);
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userState.user);

  const [logoutUser, { isLoading, isSuccess, error, isError }] =
    useLogoutUserMutation();

  useEffect(() => {
    if (isSuccess) {
      window.location.href = '/login';
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: 'top-right',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onLogoutHandler = async () => {
    logoutUser();
  };

  return (
    <>
      <AppBar position='static' sx={{ backgroundColor: '#fff' }}>
        <Container maxWidth='lg'>
          <Toolbar>
            <Typography
              variant='h6'
              onClick={() => navigate('/')}
              sx={{ cursor: 'pointer', color: '#222', fontWeight: 700 }}
            >
              3Claves
            </Typography>
            <Box display='flex' sx={{ ml: 'auto' }}>
              {/* <LoadingButton onClick={() => setOpenPostModal(true)}>
                Create Post
              </LoadingButton> */}
              {!user && (
                <>
                  <LoadingButton
                    sx={{ mr: 2 }}
                    onClick={() => navigate('/register')}
                  >
                    SignUp
                  </LoadingButton>
                  <LoadingButton onClick={() => navigate('/login')}>
                    Login
                  </LoadingButton>
                </>
              )}
              {user && (
                <>
                  <LoadingButton
                    onClick={() => navigate('/daily-and-period-averages')}
                  >
                    DailyAndPeriodAveragesPage
                  </LoadingButton>
                  <LoadingButton
                    onClick={() => navigate('/season-data-bar-chart')}
                  >
                    SeasonDataBarChart
                  </LoadingButton>

                  <LoadingButton onClick={() => navigate('/database-info')}>
                    DatabaseInfo
                  </LoadingButton>

                  <LoadingButton onClick={() => navigate('/profile')}>
                    Profile
                  </LoadingButton>
                  <LoadingButton onClick={onLogoutHandler} loading={isLoading}>
                    Logout
                  </LoadingButton>
                </>
              )}
              {user && user?.role === 'admin' && (
                <LoadingButton
                  sx={{ ml: 2, border: '2px solid #2363eb' }}
                  onClick={() => navigate('/admin')}
                >
                  Admin
                </LoadingButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <PostModal
        openPostModal={openPostModal}
        setOpenPostModal={setOpenPostModal}
      >
        <CreatePost setOpenPostModal={setOpenPostModal} />
      </PostModal>
    </>
  );
};

export default Header;
