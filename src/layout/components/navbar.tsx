import React from 'react';
import logo from '../../assets/RecipeAI-logo.png';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar flex w-full items-center justify-between gap-4 rounded-t-lg border-b border-gray-100 bg-white p-4 text-black">
      <div className="navbar-logo sm:mr-auto sm:ml-auto">
        <a href="/">
          <img
            src={logo}
            alt="Logo"
            className="h-90px text-2xl font-bold text-black no-underline"
            style={{ height: '90px' }}
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
          className="p-2 border-none rounded-sm bg-[#F2EDE8] text-[#996E4D]"
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
