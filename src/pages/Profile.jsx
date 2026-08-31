import { useEffect, useState } from "react";

import { getProfile } from "@/api/authApi";

function Profile() {
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        async function loadProfile() {
            try {

                const data = await getProfile();
                console.log("Profile Response", data);
                setProfile(data);
            }
            catch (error) {
                console.error(error);
            }
        }
        loadProfile();
    }
        , []
    )
    return (<>
        <main>
            <h1>My profile</h1>
            <p> Full name: {profile?.fullName || "Loading..."}</p>
            <p>Email: {profile?.email || "Loading..."}</p>
            <p>Phone Number : {profile?.phone || "Loading..."}</p>
            <p>Role: {profile?.role || "Loading..."}</p>

        </main>
    </>)
}

export default Profile;