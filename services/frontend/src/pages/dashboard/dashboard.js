import DashboardCard from "@/components/dashboard-card/DashboardCard";
import AddEntity from "@/components/add-entity/AddEntity";
import UserAPI from '@/api/user'
import ApiBase from "@/api/base";

export default {
    name: 'Dashboard',
    data: () => ({
        user: null
    }),
    components: {
        DashboardCard,
        AddEntity
    },
    created() {
        UserAPI.getProfile(this);
    },
    methods: {
        logout() {
            ApiBase.unauthoriseUser();
        }
    }
}