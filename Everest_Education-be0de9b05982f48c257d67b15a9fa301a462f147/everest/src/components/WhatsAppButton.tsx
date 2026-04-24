const WhatsAppButton = () => {
    return (
        <a
            href="https://wa.me/905451365495"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 left-8 bg-[#25d366] text-white w-16 h-16 rounded-full flex justify-center items-center text-3xl shadow-[0_5px_15px_rgba(0,0,0,0.2)] z-[1000] transition-transform duration-300 hover:scale-110"
        >
            <i className="fab fa-whatsapp"></i>
        </a>
    );
};

export default WhatsAppButton;
