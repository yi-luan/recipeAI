import NoFoodIcon from '@mui/icons-material/NoFood';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export interface RecipeCard {
  name: string;
  image: string;
  ingredients: string;
  instructions: string[];
}

interface RecipeCardsProps {
  recipes: RecipeCard[];
}

const RecipeCards: React.FC<RecipeCardsProps> = ({ recipes }) => {
  return (
    <div className="mt-10">
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 pb-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recipes.map((recipe, index) => (
            <Card
              key={index}
              className="flex flex-col rounded-lg"
              style={{
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                height: '400px',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={recipe.image}
                alt={recipe.name}
                className="rounded-t-lg object-cover"
                style={{ height: '200px' }}
              />
              <CardContent className="custom-scrollbar grow overflow-auto">
                <Typography gutterBottom variant="h6" component="div">
                  {recipe.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  食材：{recipe.ingredients || '無資料'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  做法：
                  {recipe.instructions && recipe.instructions.length > 0 ? (
                    <ul>
                      {recipe.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ul>
                  ) : (
                    '無資料'
                  )}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex h-52 items-center justify-center">
          <NoFoodIcon className="mr-2 text-5xl text-[#9a6e4c]" />
          <Typography variant="h6" color="text.secondary" className="ml-2">
            沒有可用的食譜
          </Typography>
        </div>
      )}
    </div>
  );
};

export default RecipeCards;
