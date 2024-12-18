// "use client";

// import { useCallback, useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { BeatLoader } from "react-spinners";

// import { FormError } from "@/components/form-error";
// import { FormSuccess } from "@/components/form-success";
// import { newJoin } from "@/features/auth/api/new-join";
// import { CardWrapper } from "@/features/auth/components/card-wrapper";

// export const NewJoinForm = () => {
//   const [error, setError] = useState();
//   const [success, setSuccess] = useState();

//   const searchParams = useSearchParams();

//   const domain = searchParams.get("domain");
//   const panel = searchParams.get("panel");

//   const onSubmit = useCallback(() => {
//     if (!domain) {
//       setError("Something went wrong!");
//       return;
//     }

//     newJoin(domain, panel)
//       .then((data) => {
//         setSuccess(data.success);
//         setError(data.error);
//       })
//       .catch(() => {
//         setError("Something went wrong!");
//       });
//   }, [domain, panel]);

//   useEffect(() => {
//     onSubmit();
//   }, [onSubmit]);

//   return (
//     <CardWrapper
//       headerLabel="Joining community"
//       backButtonLabel="Go to community"
//       backButtonHref={`/c/${domain}`}
//     >
//       <div className="flex w-full items-center justify-center">
//         {!success && !error && <BeatLoader />}
//         <FormSuccess message={success} />
//         <FormError message={error} />
//       </div>
//     </CardWrapper>
//   );
// };
