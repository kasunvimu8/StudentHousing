import { getRental } from "@/actions/rentals";
import EmailConfirmation from "@/components/custom/rental/EmailConfirmation";

const page = async ({ params }: { params: { reservationId: string[] } }) => {
  const reservationId: any = params.reservationId;
  const reservation = await getRental(reservationId);

  if (reservation) {
    return <EmailConfirmation reservation={reservation} />;
  }
};

export default page;
