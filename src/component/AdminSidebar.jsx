import {
    Sidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

function AdminSidebar({
    activeSection,
    onSectionChange,
}) {
    return (
        <Sidebar className="top-16 h-[calc(100svh-4rem)]">
            <SidebarContent className="p-4">
                <h2 className="mb-4 text-xl font-bold">
                    Admin Panel
                </h2>

                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            isActive={
                                activeSection === "overview"
                            }
                            onClick={() =>
                                onSectionChange("overview")
                            }
                        >
                            Overview
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            isActive={
                                activeSection === "users"
                            }
                            onClick={() =>
                                onSectionChange("users")
                            }
                        >
                            Users
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            isActive={
                                activeSection === "messages"
                            }
                            onClick={() =>
                                onSectionChange("messages")
                            }
                        >
                            Messages
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton
                            isActive={
                                activeSection === "services"
                            }
                            onClick={() =>
                                onSectionChange("services")
                            }
                        >
                            Services
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}

export default AdminSidebar;