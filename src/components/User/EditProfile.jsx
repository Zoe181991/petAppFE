import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import UserProfile from './UserProfile'
import UpdatePassword from './UpdatePassword'

function EditProfile() {
    return (
        <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
                <Tab>Edit Profile</Tab>
                <Tab>Update Password</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <UserProfile />
                </TabPanel>
                <TabPanel>
                    <UpdatePassword />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default EditProfile