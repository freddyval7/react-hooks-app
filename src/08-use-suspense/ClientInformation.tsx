import { use, type Usable } from "react";
import { type User } from "./api/get-user.action";

interface Props {
  getUser: Usable<User>;
}

const ClientInformation = ({ getUser }: Props) => {
  const user = use(getUser);

  return (
    <div className="bg-gradient fle flex-col gap-4">
      <h2 className="text-4xl font-thin text-white">
        {user.name} - #{user.id}
      </h2>

      <p className="text-white text-2xl">{user.location}</p>

      <p className="text-white text-2xl">{user.role}</p>
    </div>
  );
};

export default ClientInformation;
