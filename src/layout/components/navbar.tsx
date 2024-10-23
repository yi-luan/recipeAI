import React from 'react';
import logo from '../../assets/RecipeAI-logo.png';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar flex justify-between items-center p-4 gap-4 w-full text-black border-b border-gray-100 bg-white rounded-t-lg">
      <div className="navbar-logo sm:ml-auto sm:mr-auto">
        <a href="/">
          <img
            src={logo}
            alt="Logo"
            className="text-black no-underline text-2xl font-bold h-90px"
          />
        </a>
      </div>

      {/* <div className="navbar-links flex gap-4">
        <Button
          href="/function1"
          startIcon={<RestaurantMenuIcon />}
          variant="text"
          color="inherit"
          sx={{
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          生成單一食譜
        </Button>
        <Button
          href="/function2"
          startIcon={<PublicIcon />}
          variant="text"
          color="inherit"
          sx={{
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          公開食譜
        </Button>
        <Button
          href="/function3"
          startIcon={<FavoriteIcon />}
          variant="text"
          color="inherit"
          sx={{
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          我的最愛食譜
        </Button>
      </div>

      <div className="navbar-search">
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          className="p-2 border-none rounded bg-[#F2EDE8] text-[#996E4D]"
          InputProps={{
            style: {
              color: '#996E4D',
              backgroundColor: '#F2EDE8',
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: '#996E4D',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#996E4D',
              },
            },
          }}
        />
      </div>
      <div className="navbar-auth flex gap-4 mr-10">
        <a
          href="/login"
          className="text-black no-underline text-base hover:underline"
        >
          <button className="bg-[#ED802B] text-black rounded-full px-4 py-2 border-none cursor-pointer font-bold">
            Login
          </button>
        </a>
        <a
          href="/signup"
          className="text-black no-underline text-base hover:underline"
        >
          <button className="bg-[#F2EDE8] text-black rounded-full px-4 py-2 border-none cursor-pointer font-bold">
            Signup
          </button>
        </a>
      </div> */}
    </nav>
  );
};
export default Navbar;
