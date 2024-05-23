import { veriftConfirmEmail } from "@/actions/authentications";
import EmailVerification from "@/components/custom/auth/EmailVerification";

const page = async ({ params }: { params: { credentials: string[] } }) => {
  const user_id: any = params.credentials?.[0];
  const token: any = params.credentials?.[1];
  let data = {
    msg: "",
    type: "",
  };

  if (token && user_id) {
    const res = await veriftConfirmEmail(token, user_id);
    data = res;
  }
  return <EmailVerification type={data.type} msg={data.msg} />;
};

export default page;
