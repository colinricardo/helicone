import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AuthLayout from "../components/shared/layout/authLayout";
import BasePageV2 from "../components/shared/layout/basePageV2";
import { useOrg } from "../components/shared/layout/organizationContext";
import LoadingAnimation from "../components/shared/loadingAnimation";
import MetaData from "../components/shared/metaData";
import HomePage from "../components/templates/home/homePage";
import { DEMO_EMAIL } from "../lib/constants";
import { SupabaseServerWrapper } from "../lib/wrappers/supabase";

interface HomeProps {}

const Home = (props: HomeProps) => {
  const {} = props;
  const router = useRouter();

  const user = useUser();
  const orgContext = useOrg();
  const supabaseClient = useSupabaseClient();

  // useEffect(() => {
  //   async function fetchData() {
  //     const { data: userSettings, error: userSettingsError } =
  //       await supabaseClient
  //         .from("user_settings")
  //         .select("*")
  //         .eq("user", user?.id)
  //         .single();
  //     if (userSettings === null) {
  //       router.push("/welcome");
  //     }
  //   }
  //   fetchData();
  // }, [user, supabaseClient, router]);

  // router.push("/dashboard");

  // if (orgContext?.currentOrg?.has_onboarded === false && user !== null) {
  //   router.push("/welcome");
  //   return <LoadingAnimation title="Redirecting you to onboarding..." />;
  // }

  if (user && user.email !== DEMO_EMAIL) {
    router.push("/dashboard");
    return <LoadingAnimation title="Redirecting you to your dashboard..." />;
  }

  return (
    <MetaData title="Home">
      <HomePage />
    </MetaData>
  );
};

export default Home;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const supabase = new SupabaseServerWrapper(context).getClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const { data, error } = await supabase
      .from("user_settings")
      .select("*")
      .eq("user", session.user.id)
      .single();
    if (data === null) {
      return {
        redirect: {
          destination: "/welcome",
          permanent: false,
        },
      };
    }
  }
  return {
    props: {},
  };
};
