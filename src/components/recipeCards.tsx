import { Card, Empty, Typography } from 'antd';

export interface RecipeCard {
  name: string;
  image: string;
  ingredients: string;
  instructions: string[];
}

interface RecipeCardsProps {
  recipes: RecipeCard[];
}

const { Title, Text } = Typography;

const RecipeCards: React.FC<RecipeCardsProps> = ({ recipes }) => {
  return (
    <div className="mt-10">
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 pb-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recipes.map((recipe, index) => (
            <Card
              key={index}
              className="flex h-[400px] flex-col overflow-hidden rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
              cover={
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="h-[200px] w-full object-cover"
                />
              }
              styles={{ body: { padding: 16, overflow: 'auto', flex: 1 } }}
              classNames={{ body: 'custom-scrollbar' }}
            >
              <Title level={5} className="mt-0!">
                {recipe.name}
              </Title>
              <Text type="secondary" className="block text-sm">
                食材：{recipe.ingredients || '無資料'}
              </Text>
              <Text type="secondary" className="block text-sm">
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
              </Text>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex h-52 items-center justify-center">
          <Empty description="沒有可用的食譜" />
        </div>
      )}
    </div>
  );
};

export default RecipeCards;
