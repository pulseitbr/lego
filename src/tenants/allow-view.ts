import { Tenants } from ".";
import { Profile } from "./model/user/profiles";

type Props = {
	allowedProfiles: Profile[];
	allowedTenants: Tenants[];
	profiles: Profile[];
	tenant: Tenants;
};

export const AllowView = ({ allowedProfiles, allowedTenants, profiles, tenant }: Props) =>
	allowedProfiles.some((allowed) => profiles.some((profile) => profile === allowed)) && allowedTenants.includes(tenant);
