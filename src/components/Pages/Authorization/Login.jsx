import { SignIn } from '../Login/SignIn';
import { SignUp } from './SignUp';

export function Authorization() {
  return (
    <>
      <h1>Authorization Page</h1>
      <SignIn />
      <SignUp />
    </>

  );
}
