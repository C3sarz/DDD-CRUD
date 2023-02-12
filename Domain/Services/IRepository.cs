namespace Domain.Services
{
    /// <summary>
    /// CRUD interface, where the persistence operations are abstracted to the interface layer.
    /// </summary>
    /// <typeparam name="Entity"></typeparam>
    public interface IRepository<TEntity> where TEntity : Domain.Entity
    {
        public void Add(TEntity entity);
        public void Update(TEntity entity);
        public void Delete(TEntity entity);
        public void DeleteAll();
        public void GetById(int id);
        public IEnumerable<TEntity> GetAll();

    }
}
