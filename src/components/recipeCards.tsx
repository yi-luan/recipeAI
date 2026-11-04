import { Alert, Button, Card, Empty, Skeleton, Typography } from 'antd';
import fallbackDishPhoto from '../assets/ingredientPhoto.webp';

export interface RecipeCard {
  name: string;
  image: string;
  ingredients: string;
  instructions: string[];
}

interface RecipeCardsProps {
  recipes: RecipeCard[];
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string | null;
  /** How many skeleton cards to show while loading. */
  expectedCount: number;
  onRetry?: () => void;
}

const { Title, Text } = Typography;

const GRID_CLASS =
  'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
const CARD_CLASS =
  'flex h-[400px] flex-col overflow-hidden rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.12)]';

const RecipeCards: React.FC<RecipeCardsProps> = ({
  recipes,
  status,
  errorMessage,
  expectedCount,
  onRetry,
}) => {
  const renderBody = () => {
    if (status === 'loading') {
      const count = Math.min(Math.max(expectedCount, 1), 8);
      return (
        <div className={GRID_CLASS}>
          {Array.from({ length: count }, (_, index) => (
            <Card
              key={index}
              className={CARD_CLASS}
              cover={
                <div className="h-[200px] w-full animate-pulse bg-[#f2ede8]" />
              }
            >
              <Skeleton active title paragraph={{ rows: 4 }} />
            </Card>
          ))}
        </div>
      );
    }

    if (status === 'error') {
      return (
        <Alert
          type="error"
          showIcon
          title="食譜生成失敗"
          description={errorMessage}
          action={
            onRetry && (
              <Button size="small" danger onClick={onRetry}>
                重試
              </Button>
            )
          }
        />
      );
    }

    if (recipes.length === 0) {
      return (
        <div className="flex min-h-52 items-center justify-center">
          <Empty
            description={
              status === 'idle'
                ? '加入食材並按下「生成食譜」，AI 會為你搭配一桌好菜。'
                : '沒有找到符合的食譜，試試調整食材或菜系。'
            }
          />
        </div>
      );
    }

    return (
      <ul className={GRID_CLASS}>
        {recipes.map((recipe, index) => (
          <li key={`${recipe.name}-${index}`}>
            <Card
              className={CARD_CLASS}
              cover={
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.dataset.fallback) {
                      img.dataset.fallback = 'true';
                      img.src = fallbackDishPhoto;
                    }
                  }}
                  className="h-[200px] w-full object-cover"
                />
              }
              styles={{ body: { padding: 16, overflow: 'auto', flex: 1 } }}
              classNames={{ body: 'custom-scrollbar' }}
            >
              <Title level={3} className="mt-0! text-base!">
                {recipe.name}
              </Title>
              <Text type="secondary" className="block text-sm">
                <span className="font-medium">食材：</span>
                {recipe.ingredients || '無資料'}
              </Text>
              <div className="mt-2 text-sm text-[#9a6e4c]">
                <span className="font-medium">做法：</span>
                {recipe.instructions && recipe.instructions.length > 0 ? (
                  <ol className="mt-1 list-decimal space-y-1 pl-5">
                    {recipe.instructions.map((instruction, stepIndex) => (
                      <li key={stepIndex}>{instruction}</li>
                    ))}
                  </ol>
                ) : (
                  '無資料'
                )}
              </div>
            </Card>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div aria-live="polite" aria-busy={status === 'loading'}>
      <h2
        id="recipes-heading"
        className="mb-5 text-lg font-bold text-[#1b130d]"
      >
        推薦食譜
        {status === 'success' && recipes.length > 0 && (
          <span className="ml-2 text-sm font-normal text-[#9a6e4c]">
            共 {recipes.length} 道
          </span>
        )}
      </h2>
      {renderBody()}
    </div>
  );
};

export default RecipeCards;
