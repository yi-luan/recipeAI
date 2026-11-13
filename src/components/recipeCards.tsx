import { Alert, Button, Card, Empty, Skeleton, Tag, Typography } from 'antd';
import fallbackDishPhoto from '../assets/ingredientPhoto.webp';

export interface RecipeCard {
  name: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  // 以下為 Go 檢索服務新增的選填欄位，不存在時卡片維持原樣
  sourceUrl?: string;
  generated?: boolean;
  missingIngredients?: string[];
  substitutions?: Record<string, string>;
  ingredientNotes?: Record<string, string>;
  instructionsNote?: string;
}

/** 卡片上方的整體提示，例如菜單不足或搜尋服務降級。 */
export interface RecipeNotice {
  type: 'warning' | 'info';
  message: string;
}

interface RecipeCardsProps {
  recipes: RecipeCard[];
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string | null;
  notices?: RecipeNotice[];
  /** How many skeleton cards to show while loading. */
  expectedCount: number;
  onRetry?: () => void;
}

const { Title, Text } = Typography;

const GRID_CLASS =
  'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
const CARD_CLASS =
  'flex h-[400px] flex-col overflow-hidden rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.12)]';

/** 只接受 http(s) 網址，避免把 javascript: 之類的值放進連結。 */
const toSafeHttpUrl = (value: string | undefined): string | undefined => {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:'
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
};

/** 缺少的食材，加上只出現在替代建議裡的食材，每項附上替代建議（若有）。 */
const getMissingItems = (
  recipe: RecipeCard
): { name: string; substitute?: string }[] => {
  const substitutions = recipe.substitutions ?? {};
  const names = Array.from(
    new Set([
      ...(recipe.missingIngredients ?? []),
      ...Object.keys(substitutions),
    ])
  );
  return names.map((name) => ({ name, substitute: substitutions[name] }));
};

const SourceLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-medium text-[#c26d2b] underline underline-offset-2 hover:text-[#9a4f17]"
  >
    {children}
  </a>
);

const RecipeCards: React.FC<RecipeCardsProps> = ({
  recipes,
  status,
  errorMessage,
  notices = [],
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
        {recipes.map((recipe, index) => {
          const sourceUrl = toSafeHttpUrl(recipe.sourceUrl);
          const missingItems = getMissingItems(recipe);
          const ingredientNotes = recipe.ingredientNotes ?? {};
          const hasInstructions =
            recipe.instructions && recipe.instructions.length > 0;
          return (
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
                {(recipe.generated || sourceUrl) && (
                  <div className="-mt-1 mb-2 flex flex-wrap items-center gap-2 text-sm">
                    {recipe.generated && (
                      <Tag color="purple" className="me-0!">
                        AI 生成
                      </Tag>
                    )}
                    {sourceUrl && (
                      <SourceLink href={sourceUrl}>原始食譜</SourceLink>
                    )}
                  </div>
                )}
                <Text type="secondary" className="block text-sm">
                  <span className="font-medium">食材：</span>
                  {recipe.ingredients.length > 0
                    ? recipe.ingredients.map((ingredient, ingredientIndex) => (
                        <span key={`${ingredient}-${ingredientIndex}`}>
                          {ingredientIndex > 0 && ', '}
                          {ingredient}
                          {ingredientNotes[ingredient] && (
                            <Tag
                              color="orange"
                              className="ms-1! me-0! text-xs!"
                            >
                              {ingredientNotes[ingredient]}
                            </Tag>
                          )}
                        </span>
                      ))
                    : '無資料'}
                </Text>
                {missingItems.length > 0 && (
                  <div className="mt-2 text-sm text-[#1b130d]">
                    <span className="font-medium">缺少的食材：</span>
                    <ul className="mt-1 list-disc space-y-0.5 pl-5">
                      {missingItems.map((item) => (
                        <li key={item.name}>
                          {item.name}
                          {item.substitute && (
                            <span className="text-[#9a6e4c]">
                              ，可用{item.substitute}替代
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-2 text-sm text-[#9a6e4c]">
                  <span className="font-medium">做法：</span>
                  {hasInstructions ? (
                    <>
                      {recipe.instructionsNote && (
                        <span>{recipe.instructionsNote}</span>
                      )}
                      <ol className="mt-1 list-decimal space-y-1 pl-5">
                        {recipe.instructions.map((instruction, stepIndex) => (
                          <li key={stepIndex}>{instruction}</li>
                        ))}
                      </ol>
                    </>
                  ) : recipe.instructionsNote ? (
                    // 例如「步驟請見原文」：沒有步驟，改顯示原文連結
                    sourceUrl ? (
                      <SourceLink href={sourceUrl}>
                        {recipe.instructionsNote}
                      </SourceLink>
                    ) : (
                      recipe.instructionsNote
                    )
                  ) : (
                    '無資料'
                  )}
                </div>
              </Card>
            </li>
          );
        })}
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
      {status === 'success' && notices.length > 0 && (
        <div className="mb-5 flex flex-col gap-3">
          {notices.map((notice) => (
            <Alert
              key={notice.message}
              type={notice.type}
              showIcon
              title={notice.message}
            />
          ))}
        </div>
      )}
      {renderBody()}
    </div>
  );
};

export default RecipeCards;
