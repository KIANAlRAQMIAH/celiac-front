// utils/usePermissions.ts
import { useState, useEffect } from 'react';

type Permission = {
  id: number;
  name: string;
  module: string;
  action: string;
};

type PermissionsData = Record<string, Permission[]>;

export const usePermissions = () => {
  const [permissionsData, setPermissionsData] = useState<PermissionsData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const permissionsString = localStorage.getItem('permissions');
        if (permissionsString) {
          const parsedPermissions: Permission[] = JSON.parse(permissionsString);
          const groupedPermissions = parsedPermissions.reduce((acc: PermissionsData, permission: Permission) => {
            if (!acc[permission.module]) {
              acc[permission.module] = [];
            }
            acc[permission.module].push(permission);
            return acc;
          }, {});
          setPermissionsData(groupedPermissions);
        }
      } catch (error) {
        console.error('Error parsing permissions from local storage', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPermissions();
  }, []); 

  const checkPermission = (model: string, action: string): boolean => {
    if (!permissionsData) return false;

    const modelPermissions = permissionsData[model];
    if (!modelPermissions) return false;

    return modelPermissions.some((permission: Permission) => permission.action === action);
  };

  const canCreate = (model: string): boolean => {
    return checkPermission(model, 'create');
  };

  const canRead = (model: string): boolean => {
    return checkPermission(model, 'read');
  };

  const canUpdate = (model: string): boolean => {
    return checkPermission(model, 'update');
  };

  const canDelete = (model: string): boolean => {
    return checkPermission(model, 'delete');
  };

  return { isLoading, isError, canCreate, canRead, canUpdate, canDelete };
};
