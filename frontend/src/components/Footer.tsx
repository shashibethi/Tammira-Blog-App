const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="text-gray-600 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} BlogApp. All rights reserved.
          </div>
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;