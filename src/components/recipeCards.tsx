import NoFoodIcon from '@mui/icons-material/NoFood';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

type Recipe = {
  name: string;
  time: string;
  calories: string;
  image: string;
  ingredients: string;
  instructions: string;
};

const recipes: Recipe[] = [
  {
    name: '香煎雞胸肉配蔬菜',
    time: '30分鐘',
    calories: '350卡路里',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435',
    ingredients: '雞胸肉、西蘭花、胡蘿蔔、橄欖油、鹽、胡椒',
    instructions: '1. 雞胸肉調味 2. 煎雞胸肉 3. 蒸煮蔬菜 4. 擺盤',
  },
  {
    name: '番茄義大利麵',
    time: '25分鐘',
    calories: '400卡路里',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8',
    ingredients: '義大利麵、番茄、大蒜、橄欖油、羅勒、帕瑪森起司',
    instructions: '1. 煮麵 2. 製作番茄醬 3. 拌麵 4. 撒起司',
  },
  {
    name: '蔬菜沙拉',
    time: '15分鐘',
    calories: '200卡路里',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    ingredients: '生菜、小番茄、黃瓜、紅洋蔥、橄欖油、檸檬汁',
    instructions: '1. 切菜 2. 製作醬汁 3. 拌勻 4. 冷藏',
  },
  {
    name: '烤鮭魚配蘆筍',
    time: '35分鐘',
    calories: '450卡路里',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
    ingredients: '鮭魚、蘆筍、檸檬、橄欖油、迷迭香、鹽、胡椒',
    instructions: '1. 預熱烤箱 2. 調味鮭魚 3. 準備蘆筍 4. 烤鮭魚和蘆筍 5. 擺盤',
  },
  {
    name: '素食咖哩',
    time: '40分鐘',
    calories: '300卡路里',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641',
    ingredients: '花椰菜、胡蘿蔔、馬鈴薯、洋蔥、咖哩粉、椰奶、米飯',
    instructions: '1. 切菜 2. 炒香香料 3. 加入蔬菜 4. 煮咖哩 5. 煮飯 6. 盛盤',
  },
  {
    name: '水果優格碗',
    time: '10分鐘',
    calories: '250卡路里',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/1/1a/%E5%AE%AE%E4%BF%9D%E9%9B%9E%E4%B8%81.JPG',
    ingredients: '希臘優格、藍莓、草莓、香蕉、燕麥、蜂蜜',
    instructions: '1. 準備水果 2. 放入優格 3. 加入水果和燕麥 4. 淋上蜂蜜',
  },
];

const RecipeCards: React.FC = () => {
  return (
    <div className="mt-10">
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pb-5">
          {recipes.map((recipe, index) => (
            <Card
              key={index}
              className="rounded-lg flex flex-col"
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
              <CardContent className="flex-grow overflow-auto">
                <Typography gutterBottom variant="h6" component="div">
                  {recipe.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  時間：{recipe.time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  卡路里：{recipe.calories}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  食材：{recipe.ingredients || '無資料'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  做法：{recipe.instructions || '無資料'}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-52">
          <NoFoodIcon className="text-5xl text-[#9a6e4c] mr-2" />
          <Typography variant="h6" color="text.secondary" className="ml-2">
            沒有可用的食譜
          </Typography>
        </div>
      )}
    </div>
  );
};

export default RecipeCards;
