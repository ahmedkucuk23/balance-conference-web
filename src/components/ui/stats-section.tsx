import { MoveUpRight, Users, Award, Heart, Star } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  iconColor?: string;
}

function StatCard({ icon, value, label, iconColor = "text-purple-400" }: StatCardProps) {
  return (
    <div className="flex gap-0 flex-col justify-between p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
      <div className={`w-10 h-10 mb-10 ${iconColor}`}>
        {icon}
      </div>
      <h2 className="text-4xl tracking-tighter max-w-xl text-left font-bold text-white">
        {value}
      </h2>
      <p className="text-base leading-relaxed tracking-tight text-white/60 max-w-xl text-left mt-2">
        {label}
      </p>
    </div>
  );
}

function Stats() {
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="grid text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4 lg:gap-6">
          <StatCard
            icon={<Users className="w-full h-full" />}
            value="300"
            label="Učesnika"
            iconColor="text-purple-400"
          />
          <StatCard
            icon={<Award className="w-full h-full" />}
            value="9"
            label="Predavača"
            iconColor="text-pink-400"
          />
          <StatCard
            icon={<Heart className="w-full h-full" />}
            value="30"
            label="Medija"
            iconColor="text-purple-400"
          />
          <StatCard
            icon={<Star className="w-full h-full" />}
            value="20"
            label="Influensera"
            iconColor="text-pink-400"
          />
        </div>
      </div>
    </div>
  );
}

export { Stats };
