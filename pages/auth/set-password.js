import { Box } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import PasswordInput from "components/Common/Inputs/TextInput/PasswordInput";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
import TermsAndConditionsSection from "components/Common/TermsAndCondiotions/TermsAndConditionsSection";
import API_RESPONSE_STATUS from "constants/status/apiResponseStatus";
import AuthLayout from "layouts/AuthLayout";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { useCookies } from "react-cookie";
import appFetch from "utils/appFetch";

export default function SetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = React.useState(false);

  const [error, setError] = React.useState({});
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const handleBlurInput = (e) => {
    if (password === confirmPassword)
      return setError({
        confirmPassword: "",
      });
    return setError({
      confirmPassword: "Password does not match",
    });
  };
  const resetForm = () => {
    setPassword("");
    setConfirmPassword("");
  };
  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) return;
    setLoading(true);
    const url = `https://api.bluecom.ai/api/merchant/resetPassword`;
    const data = {
      token,
      password: password,
      confirm_password: confirmPassword,
    };
    appFetch(url, data)
      .then((json) => {
        if (json.status === API_RESPONSE_STATUS.SUCCESS) {
          setLoading(false);
          enqueueSnackbar(json.message);
          router.push("/auth/login");
          resetForm();
        }
        if (json.status === API_RESPONSE_STATUS.FAILURE) {
          setLoading(false);
          enqueueSnackbar(json.message);
        }
      })
      .catch((error) => console.log(error));
  };
  const title = `Enter new password for your account!`;
  return (
    <AuthLayout pageTitle={title} headingTitle={title}>
      {loading && <PageLoader />}
      <Box
        sx={{
          "& .row": {
            display: "flex",
            justifyContent: "center",
            mt: 4,
          },
        }}
      >
        <form onSubmit={handleUpdatePassword}>
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            title={`Password`}
          />
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            title={"Confirm Password"}
            onBlur={(e) => handleBlurInput(e)}
            error={error.confirmPassword}
            helperText={error.confirmPassword}
          />

          {/* {inputFields.map((item) => {
						return (
							<PasswordInput
								key={item.key}
								value={inputs[item.key]}
								onChange={(e) =>
									handleChangeInput(e, inputs[item.key])
								}
								name={item.key}
								title={item.label}
								helperText={error[item.key] && error[item.key]}
								error={error[item.key]}
							/>
						);
					})} */}
          <div className="row">
            <PrimaryButton
              type={"submit"}
              disabled={password !== confirmPassword}
            >
              Set password
            </PrimaryButton>
          </div>
        </form>
        <TermsAndConditionsSection />
      </Box>
    </AuthLayout>
  );
}

const inputFields = [
  {
    key: "password",
    label: "Password",
    type: "password",
    required: true,
  },
  {
    key: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    required: true,
  },
];
