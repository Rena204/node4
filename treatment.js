// Получение данных пользователей
app.get('/users', (req, res) => {
    fs.readFile('users.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server Error');
        return;
      }
      res.json(JSON.parse(data));
    });
  });
  
  // Создание пользователя
  app.post('/users', (req, res) => {
    const newUser = req.body;
  
    fs.readFile('users.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server Error');
        return;
      }
  
      const users = JSON.parse(data);
      users.push(newUser);
  
      fs.writeFile('users.json', JSON.stringify(users), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Server Error');
          return;
        }
        res.status(201).send('User Created Successfully');
      });
    });
  });
  
  // Обновление пользователя
  app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;
  
    fs.readFile('users.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server Error');
        return;
      }
  
      const users = JSON.parse(data);
      const userIndex = users.findIndex(user => user.id === userId);
  
      if (userIndex === -1) {
        res.status(404).send('User Not Found');
        return;
      }
  
      users[userIndex] = { ...users[userIndex], ...updatedUserData };
  
      fs.writeFile('users.json', JSON.stringify(users), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Server Error');
          return;
        }
        res.status(200).send('User Updated Successfully');
      });
    });
  });
  
  // Удаление пользователя
  app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
  
    fs.readFile('users.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server Error');
        return;
      }
  
      let users = JSON.parse(data);
      users = users.filter(user => user.id !== userId);
  
      fs.writeFile('users.json', JSON.stringify(users), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Server Error');
          return;
        }
        res.status(200).send('User Deleted Successfully');
      });
    });
  });
  
  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  