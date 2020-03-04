// Architecture base
const user = {
  table: {
    name: '',
    cpf: '',
    age: '',
    sex: '',
  },
};

describe('Object confirm', () => {
  it('should compare objects', async () => {
    const newUser = {
      name: 'dimas',
      cpf: '546321654',
      age: 22,
      sex: 'm',
    };

    expect(newUser).checkObject(user.table);
  });

  it('should not compare objects with less keys then pattern', async () => {
    const newUser = {
      name: 'dimas',
      cpf: '546321654',
      age: 22,
      // Removed sex
    };

    expect(newUser).not.checkObject(user.table);
  });

  it('should not compare objects with more keys then pattern', async () => {
    const newUser = {
      truth: false, // Add truth
      name: 'dimas',
      cpf: '546321654',
      age: 22,
      sex: 'm',
    };

    expect(newUser).not.checkObject(user.table);
  });

  it('should not compare objects with wrong key', async () => {
    const newUser = {
      name: 'dimas',
      cpf: '546321654',
      ages: 22,
      sex: 'm',
    };

    expect(newUser).not.checkObject(user.table);
  });

  it('should compare an array os objects', () => {
    const users = [
      {
        name: 'dimas',
        cpf: '546321654',
        age: 22,
        sex: 'm',
      },
      {
        name: 'dimas',
        cpf: '546321654',
        age: 22,
        sex: 'm',
      },
      {
        name: 'dimas',
        cpf: '546321654',
        age: 22,
        sex: 'm',
      },
      {
        name: 'dimas',
        cpf: '546321654',
        age: 22,
        sex: 'm',
      },
      {
        name: 'dimas',
        cpf: '546321654',
        age: 22,
        sex: 'm',
      },
    ];

    expect(users).checkListObjects(user.table);
  });

  it('should not compare an array of objects with wrong key', () => {
    const users = [
      {
        name: 'dimas',
        cpf: '546321654',
        ages: 22, // Wrong key
        sex: 'm',
      },
      {
        name: 'dimas',
        cpf: '546321654',
        age: 22,
        sex: 'm',
      },
      {
        name: 'dimas',
        cpf: '546321654',
        age: 22,
        sex: 'm',
      },
      {
        name: 'dimas',
        cpf: '546321654',
        age: 22,
        sex: 'm',
      },
      {
        name: 'dimas',
        cpf: '546321654',
        age: 22,
        sex: 'm',
      },
    ];

    expect(users).not.checkListObjects(user.table);
  });

  it('should not compare an array of objects without same amount of keys, more', () => {
    const users = [
      {
        truth: false, // Add truth
        name: 'dimas',
        cpf: '546321654',
        age: 22,
        sex: 'm',
      },
      {
        name: 'dimas',
        cpf: '546321654',
        age: 22,
        sex: 'm',
      },
      {
        name: 'dimas',
        cpf: '546321654',
        age: 22,
        sex: 'm',
      },
      {
        name: 'dimas',
        cpf: '546321654',
        age: 22,
        sex: 'm',
      },
      {
        name: 'dimas',
        cpf: '546321654',
        age: 22,
        sex: 'm',
      },
    ];

    expect(users).checkListObjects(user.table);
  });

  it('should not compare an array of objects without same amount of keys, less', () => {
    const users = [
      {
        cpf: '546321654',
        age: 22,
        sex: 'm',
        // missing name
      },
      {
        name: 'dimas',
        cpf: '546321654',
        age: 22,
        sex: 'm',
      },
      {
        name: 'dimas',
        cpf: '546321654',
        age: 22,
        sex: 'm',
      },
      {
        name: 'dimas',
        cpf: '546321654',
        age: 22,
        sex: 'm',
      },
      {
        name: 'dimas',
        cpf: '546321654',
        age: 22,
        sex: 'm',
      },
    ];

    expect(users).checkListObjects(user.table);
  });
});

const check = (compareObject, objectPattern) => {
  if (Object.keys(compareObject).length !== Object.keys(objectPattern).length) {
    return { pass: false, type: 'length' };
  }

  const listKeys = Object.keys(compareObject).map((key) => {
    if (Object.keys(objectPattern).includes(key)) {
      return true;
    }
    return false;
  });

  return listKeys.includes(false);
};

expect.extend({
  checkObject(object1, object2) {
    const result = check(object1, object2);

    if (result.type) {
      return {
        pass: false,
        message: () => `Objects doesnt match
        first object keys: ${Object.keys(object1).length}
        second object keys: ${Object.keys(object2).length}`,
      };
    }

    if (!result) {
      return { pass: true, message: () => '' };
    }

    return {
      pass: false,
      message: () => 'Objects doesnt match',
    };
  },
});

expect.extend({
  checkListObjects(objects, objectPattern) {
    const listCheck = objects.map((object) => {
      return check(object, objectPattern);
    });

    if (listCheck.includes({ pass: false, type: 'length' })) {
      return {
        pass: false,
        message: () => `One or more of objects doesnt have the same amount
        of keys like pattern \n${objectPattern}`,
      };
    }

    if (listCheck.includes(true)) {
      return {
        pass: false,
        message: () => 'One or more objects doesnt match with pattern',
      };
    }

    return {
      pass: true,
      message: () => '',
    };
  },
});
