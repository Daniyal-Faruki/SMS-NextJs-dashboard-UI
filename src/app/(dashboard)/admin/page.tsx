import Announcements from "@/components/unUsed/Announcements"
import AttendanceChart from "@/components/unUsed/AttendanceChart"
import CountChart from "@/components/unUsed/CountChart"
import EventCalendar from "@/components/unUsed/EventCalendar"
import FinanceChart from "@/components/unUsed/FinanceChart"
import UserCard from "@/components/unUsed/UserCard"

const AdminPage = () => {
    return (
        <div className="p-4 flex gap-4 flex-col md:flex-row">
            {/* Left */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
                {/* User Cards */}
                <div className="flex gap-4 justify-between flex-wrap">
                    <UserCard type="student"></UserCard>
                    <UserCard type="teacher"></UserCard>
                    <UserCard type="parent"></UserCard>
                    <UserCard type="staff"></UserCard>
                </div>
                {/* Middle Charts */}
                <div className="flex gap-4 flex-col lg:flex-row">
                    {/* Count Chart */}
                    <div className="w-full lg:w-1/3 h-[450px]">
                        <CountChart />
                    </div>
                    {/* Attendance Chart */}
                    <div className="w-full lg:w-2/3 h-[450px]">
                        <AttendanceChart />
                    </div>
                </div>
                {/* Bottom Chart */}
                <div className="w-full h-[500px]">
                    <FinanceChart />
                </div>
            </div>
            {/* Right */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
                <EventCalendar />
                <Announcements />
            </div>
        </div>
    )
}

export default AdminPage