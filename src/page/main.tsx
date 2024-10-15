import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

const RecipePage: React.FC = () => {
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);

  const handleAddIngredient = () => {
    if (ingredient.trim()) {
      setIngredients([...ingredients, ingredient]);
      setIngredient('');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        食譜頁面
      </Typography>
      <TextField
        label="輸入食材"
        value={ingredient}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
          setIngredient(e.target.value)
        }
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddIngredient}>
        添加食材
      </Button>
      <List>
        {ingredients.map((ing, index) => (
          <ListItem key={index}>
            <ListItemText primary={ing} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default RecipePage;
