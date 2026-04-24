interface TeamMemberCardProps {
    name: string;
    position: string;
    image: string;
    size?: 'small' | 'large';
}

const TeamMemberCard = ({
    name,
    position,
    image,
    size = 'small'
}: TeamMemberCardProps) => {
    const imageSize = size === 'large' ? 'w-64 h-64' : 'w-48 h-48';

    return (
        <div className="flex flex-col items-center group">
            {/* Circular Image Container */}
            <div className="relative mb-4">
                <div className={`${imageSize} rounded-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105`}>
                    <div
                        className="w-full h-full bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url('${image}')`
                        }}
                    ></div>
                </div>
            </div>

            {/* Info Card */}
            <div className={`bg-gradient-to-r from-[#5B7FC7] to-[#4A6BB3] rounded-2xl shadow-lg ${size === 'large' ? 'px-8 py-4 min-w-[280px]' : 'px-6 py-3 min-w-[220px]'}`}>
                <h3 className={`font-bold text-white text-center mb-1 ${size === 'large' ? 'text-2xl' : 'text-lg'}`}>
                    {name}
                </h3>
                <p className={`text-white/90 text-center ${size === 'large' ? 'text-base' : 'text-sm'}`}>
                    {position}
                </p>
            </div>
        </div>
    );
};

export default TeamMemberCard;
