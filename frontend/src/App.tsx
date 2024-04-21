import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/layout';
import RequireUser from './components/requireUser';
import DailyAndPeriodAveragesPage from './pages/DailyAndPeriodAveragesPage';
import DatabaseInfo from './pages/DatabaseInfo';
import SeasonDataBarChart from './pages/SeasonDataBarChart';
import AdminPage from './pages/admin.page';
import ForgotPasswordPage from './pages/forgot-password.page';
import HomePage from './pages/home.page';
import LoginPage from './pages/login.page';
import ProfilePage from './pages/profile.page';
import RegisterPage from './pages/register.page';
import ResetPasswordPage from './pages/reset-password.page';
import UnauthorizePage from './pages/unauthorize.page';
import EmailVerificationPage from './pages/verifyemail.page';

function App() {
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route element={<RequireUser allowedRoles={['user', 'admin']} />}>
            <Route index element={<HomePage />} />
          </Route>

          {/* Private Route */}

          <Route element={<RequireUser allowedRoles={['user', 'admin']} />}>
            <Route
              path='daily-and-period-averages'
              element={<DailyAndPeriodAveragesPage />}
            />
          </Route>

          <Route element={<RequireUser allowedRoles={['user', 'admin']} />}>
            <Route
              path='season-data-bar-chart'
              element={<SeasonDataBarChart />}
            />
          </Route>

          <Route element={<RequireUser allowedRoles={['user', 'admin']} />}>
            <Route path='database-info' element={<DatabaseInfo />} />
          </Route>

          <Route element={<RequireUser allowedRoles={['user', 'admin']} />}>
            <Route path='profile' element={<ProfilePage />} />
          </Route>
          <Route element={<RequireUser allowedRoles={['admin']} />}>
            <Route path='admin' element={<AdminPage />} />
          </Route>
          <Route path='unauthorized' element={<UnauthorizePage />} />
        </Route>
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
        <Route path='verifyemail' element={<EmailVerificationPage />}>
          <Route path=':verificationCode' element={<EmailVerificationPage />} />
        </Route>
        <Route path='forgotpassword' element={<ForgotPasswordPage />} />
        <Route path='resetpassword' element={<ResetPasswordPage />}>
          <Route path=':resetToken' element={<ResetPasswordPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
